"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import categoryicon from "@/public/agentpanelicons/sidebardocumentsicon.svg";
import { categoryGroups } from "./categoryGroups";
import { categoryItems } from "@/components/Home/Category";
import { flags } from "@/components/Home/LanguageSelection";
import { Endpoints } from "@/lib/api/Endpoints";
import {
  categoryImages, createItem, deleteItem, exportItems, listItems, updateItem, type ApiCategory, type Resource,
} from "@/lib/api/categories";
import { studentResidencyCitiesData } from "@/lib/student-residency/popular-cities-data";
import aussie from "@/public/aussieBank.svg";
import nab from "@/public/nabbank.svg";
import anz from "@/public/anzbank.svg";
import cba from "@/public/commonwealthbank.svg";
import westpac from "@/public/westpacbank.svg";
import sheraton from "@/public/sheraton.svg";
import marriott from "@/public/marriott.svg";
import hilton from "@/public/hilton.svg";
import holidayinn from "@/public/holidayinn.svg";
import partner1 from "@/public/partner1.svg";
import partner2 from "@/public/partner2.svg";
import partner3 from "@/public/partner3.svg";
import partner4 from "@/public/partner4.svg";
import partner5 from "@/public/partner5.svg";
import knightfrank from "@/public/knightFrank.svg";
import cbre from "@/public/cbre.svg";
import jll from "@/public/jLL.svg";
import colliers from "@/public/colliers.svg";
import raywhite from "@/public/raywhite.svg";
import century21 from "@/public/century21.svg";
import mcgrath from "@/public/mcgrath.svg";
import ljhooker from "@/public/ljhooker.svg";
import harcourts from "@/public/harcourts.svg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const GOLD_BORDER = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};
const field =
  "rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-[#E1AB18]";

type Category = {
  id: number;
  name: string;
  group: string;
  active: boolean;
  images: string[];
  extras: string[];
  apiId?: number | string; // set when the row is saved in the API
};

// ponytail: local state + demo data from the homepage, swap for an API when it exists (changes are lost on reload)
const row = (group: string, name: string, img: StaticImageData | string, ...extras: string[]) =>
  ({ group, name, images: [typeof img === "string" ? img : img.src], extras });
const seed: Category[] = [
  // same tiles (and every image) the homepage shows
  ...categoryItems.map((t) => ({ group: "homepage", name: t.title, images: t.imgs.map((i) => i.src), extras: [""] })),
  ...Object.entries(studentResidencyCitiesData).map(([city, ps]) =>
    row("cities", city, ps[0].img, `$${Math.min(...ps.map((x) => x.price))}`)),
  row("broker", "Aussie", aussie, "6.94% p.a."), row("broker", "NAB", nab, "6.94% p.a."),
  row("broker", "ANZ", anz, "6.94% p.a."), row("broker", "Commonwealth Bank", cba, "6.94% p.a."),
  row("broker", "Westpac", westpac, "6.94% p.a."),
  // same languages and flags the homepage shows
  ...flags.map((f) => row("language", f.name, f.icon, f.country ?? "")),
  row("hotel", "Sheraton", sheraton), row("hotel", "Marriott", marriott),
  row("hotel", "Hilton", hilton), row("hotel", "Holiday Inn", holidayinn),
  row("studentResidency", "Partner 1", partner1), row("studentResidency", "Partner 2", partner2),
  row("studentResidency", "Partner 3", partner3), row("studentResidency", "Partner 4", partner4),
  row("studentResidency", "Partner 5", partner5),
  row("commercial", "Knight Frank", knightfrank), row("commercial", "CBRE", cbre),
  row("commercial", "JLL", jll), row("commercial", "Colliers", colliers),
  row("agency", "Ray White", raywhite), row("agency", "Century 21", century21),
  row("agency", "McGrath", mcgrath), row("agency", "LJ Hooker", ljhooker), row("agency", "Harcourts", harcourts),
].map((c, i) => ({ ...c, id: i + 1, active: true }));

const readFile = (f: File) =>
  new Promise<string>((res) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result));
    r.readAsDataURL(f);
  });
const readFiles = (fs: File[]) => Promise.all(fs.filter((f) => f.size).map(readFile));

// Sections saved in the API: the endpoints, and the form fields for Name followed by each extra column
const apis: Record<string, { endpoints: Resource; fields: string[]; csv: string }> = {
  homepage: { endpoints: Endpoints.categories, fields: ["name", "description"], csv: "categories.csv" },
  language: { endpoints: Endpoints.languages, fields: ["language_name", "country_name"], csv: "languages.csv" },
};

const fromApi = (c: ApiCategory, id: number, group: string, fields: string[]): Category => ({
  id,
  name: String(c[fields[0]] ?? ""),
  group,
  active: c.status !== "inactive",
  images: categoryImages(c),
  extras: fields.slice(1).map((k) => String(c[k] ?? "")),
  apiId: c.id,
});

const blurOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && e.currentTarget.blur();

const bySlug = (slug?: string) => categoryGroups.find((g) => g.slug === slug);

export default function AdminPanelCategories({ group }: { group: string }) {
  const [items, setItems] = useState(seed);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const current = bySlug(group)!;
  const imageLabel = "image" in current ? current.image : "Image";
  const multi = "multiImage" in current;
  const extraLabels = current.extras;
  const api = apis[group];

  // true while the API has no homepage categories yet → offer a one-time import of the built-in tiles
  const [canImport, setCanImport] = useState(false);
  const [importing, setImporting] = useState(false);

  const load = useCallback(
    (search = "") => {
      if (!api) return;
      listItems(api.endpoints, search).then((res) => {
        if (!res.success) return;
        const list = res.data ?? [];
        if (!search && group === "homepage") setCanImport(!list.length);
        setItems((l) => {
          const next = Math.max(0, ...l.map((x) => x.id)) + 1;
          const rows = list.map((c, i) => fromApi(c, next + i, group, api.fields));
          // no image saved yet → show the built-in one with the same name (e.g. the homepage flag)
          for (const r of rows) {
            if (!r.images.length)
              r.images = seed.find((x) => x.group === group && x.name.toLowerCase() === r.name.toLowerCase())?.images ?? [];
          }
          // saved rows first, then every built-in row not saved yet (matched by name)
          const saved = new Set(rows.map((r) => r.name.toLowerCase()));
          const builtIn = l.filter((c) => c.group === group && c.apiId == null && !saved.has(c.name.toLowerCase()));
          return [...l.filter((c) => c.group !== group), ...rows, ...builtIn];
        });
      });
    },
    [group, api],
  );
  // search runs on the server (debounced); the built-in tiles are filtered locally below
  useEffect(() => {
    const t = setTimeout(() => load(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q, load]);

  async function importTiles() {
    if (!confirm(`Save all ${categoryItems.length} homepage tiles to the database?`)) return;
    setImporting(true);
    setCanImport(false);
    const failed: string[] = [];
    for (const t of categoryItems) {
      const body = new FormData();
      body.append("name", t.title);
      body.append("description", "");
      for (const img of t.imgs) {
        const blob = await (await fetch(img.src)).blob();
        body.append("image", new File([blob], img.src.split("/").pop()!, { type: blob.type }));
      }
      body.append("status", "active");
      if (!(await createItem(Endpoints.categories, body)).success) failed.push(t.title);
    }
    setImporting(false);
    if (failed.length) alert(`Could not import: ${failed.join(", ")}`);
    load();
  }

  const patch = (id: number, p: Partial<Category>) =>
    setItems((l) => l.map((c) => (c.id === id ? { ...c, ...p } : c)));

  // Saves to the API first when the row exists there, then updates the table
  async function save(c: Category, p: Partial<Category>, fields: Record<string, string> = {}, files: File[] = []) {
    if (!api) return patch(c.id, p);
    const next = { ...c, ...p };
    let res;
    if (c.apiId == null) {
      // built-in row, not in the API yet → create it with everything it has, including its built-in images
      const body = new FormData();
      [next.name, ...next.extras].forEach((v, i) => api.fields[i] && body.append(api.fields[i], v ?? ""));
      for (const src of next.images.filter((x) => !x.startsWith("data:"))) {
        const blob = await (await fetch(src)).blob();
        body.append("image", new File([blob], src.split("/").pop()!.split("?")[0], { type: blob.type }));
      }
      files.forEach((f) => body.append("image", f));
      body.append("status", next.active ? "active" : "inactive");
      res = await createItem(api.endpoints, body);
    } else if (files.length) {
      const body = new FormData();
      Object.entries(fields).forEach(([k, v]) => body.append(k, v));
      files.forEach((f) => body.append("image", f));
      res = await updateItem(api.endpoints, c.apiId, body);
    } else {
      res = await updateItem(api.endpoints, c.apiId, fields);
    }
    if (!res.success) return alert(res.message || "Could not save changes");
    patch(c.id, p);
    load(q.trim()); // show what the API actually stored
  }

  // values = [name, ...extras] from the edit inputs; only changed fields are sent
  function commit(c: Category, values: string[]) {
    setEditing(null);
    const [name, ...extras] = values;
    if (!name) return;
    const old = [c.name, ...c.extras];
    const fields: Record<string, string> = {};
    values.forEach((v, i) => {
      if (v !== (old[i] ?? "") && api?.fields[i]) fields[api.fields[i]] = v;
    });
    if (values.every((v, i) => v === (old[i] ?? ""))) return;
    save(c, { name, extras }, fields);
  }

  async function remove(c: Category) {
    if (!confirm(`Delete "${c.name}"?`)) return;
    if (api && c.apiId != null) {
      const res = await deleteItem(api.endpoints, c.apiId);
      if (!res.success) return alert(res.message || "Could not delete category");
    }
    setItems((l) => l.filter((x) => x.id !== c.id));
  }

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name")).trim();
    if (!name) return;
    const files = (f.getAll("image") as File[]).filter((x) => x.size);
    const extras = extraLabels.map((_, i) => String(f.get(`extra${i}`)).trim());
    if (api) {
      const body = new FormData();
      [name, ...extras].forEach((v, i) => body.append(api.fields[i], v));
      files.forEach((x) => body.append("image", x));
      body.append("status", "active");
      const res = await createItem(api.endpoints, body);
      if (!res.success) return alert(res.message || "Could not add");
      form.reset();
      return load(q.trim());
    }
    const images = await readFiles(files);
    setItems((l) => [
      ...l,
      {
        id: Math.max(0, ...l.map((c) => c.id)) + 1,
        name,
        group: current.slug,
        active: true,
        images,
        extras,
      },
    ]);
    form.reset();
  }

  const rows = items.filter(
    (c) => c.group === group && c.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-5 text-gray-900">
      <h1
        className={`flex w-fit items-center gap-6 rounded-xl border-2 border-transparent px-3 py-2 text-2xl font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
        style={GOLD_BORDER}
      >
        Manage Category · {current.label}
        <Image src={categoryicon} alt="" className="size-10" />
      </h1>

      <section className="rounded-2xl bg-white p-4 shadow-[0_0_12px_#DDE3EE]">
        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={add} className="flex flex-wrap items-center gap-3">
            <input name="name" required placeholder="Name" className={field} />
            {extraLabels.map((l, i) => (
              <input key={`${current.slug}-${i}`} name={`extra${i}`} placeholder={l} className={field} />
            ))}
            <label className={`${field} flex cursor-pointer items-center gap-2 text-sm text-gray-600`}>
              {imageLabel}
              <input name="image" type="file" accept="image/*" multiple={multi} className="w-44 text-xs" />
            </label>
            <button
              className={`flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-1.5 font-semibold text-[#E1AB18] ${SOFT_SHADOW}`}
              style={GOLD_BORDER}
            >
              <Plus className="size-6 rounded-full bg-[#D9A91B] p-1 text-white" strokeWidth={4} /> Add
            </button>
          </form>
          {(canImport || importing) && (
            <button
              type="button"
              onClick={importTiles}
              disabled={importing}
              className={`rounded-xl border-2 border-transparent px-3 py-1.5 font-semibold text-[#E1AB18] disabled:opacity-60 ${SOFT_SHADOW}`}
              style={GOLD_BORDER}
            >
              {importing ? "Importing…" : "Import homepage tiles"}
            </button>
          )}
          <label className={`ml-auto flex w-64 items-center rounded-full bg-white px-4 py-2 ${SOFT_SHADOW}`}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type to search"
              className="w-full bg-transparent italic outline-none placeholder:text-gray-400"
            />
            <Search className="size-6 text-[#E1AB18]" />
          </label>
          {api && group !== "homepage" && (
            <button
              type="button"
              onClick={async () => {
                const res = await exportItems(api.endpoints, api.csv);
                if (!res.success) alert(res.message || "Could not export");
              }}
              className={`rounded-xl border-2 border-transparent px-3 py-1.5 font-semibold text-[#E1AB18] ${SOFT_SHADOW}`}
              style={GOLD_BORDER}
            >
              Export CSV
            </button>
          )}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-[#EAF2FC] text-sm font-semibold text-[#0A7BD6]">
              <tr>
                {[imageLabel, "Name", ...extraLabels, "Status", "Action"].map((c, i) => (
                  <th key={i} className="px-4 py-3">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-100"
                  // editing covers Name and every extra column; save once focus leaves the row
                  onBlur={(e) => {
                    if (editing !== c.id || e.currentTarget.contains(e.relatedTarget)) return;
                    commit(c, [...e.currentTarget.querySelectorAll<HTMLInputElement>("input[data-edit]")].map((i) => i.value.trim()));
                  }}
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {!multi && (
                        // single-image sections (flag, logo): click or hover the image to replace it
                        <label aria-label={`Change ${imageLabel.toLowerCase()}`} className="group relative cursor-pointer">
                          {c.images[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={c.images[0]} alt={c.name} className="h-10 w-16 object-contain" />
                          ) : (
                            <span className="flex h-10 w-16 items-center justify-center text-gray-400">—</span>
                          )}
                          <span className="absolute inset-0 flex items-center justify-center rounded bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                            <Pencil className="size-5 text-white" />
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              e.target.value = "";
                              if (!file) return;
                              save(c, { images: [await readFile(file)] }, {}, [file]);
                            }}
                          />
                        </label>
                      )}
                      {multi && c.images.map((src, i) => (
                        <span key={i} className="group relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt={c.name} className="h-10 w-16 object-contain" />
                          {multi && (
                            <button
                              aria-label="Remove image"
                              // ponytail: no API for removing one image yet, so this only changes the table
                              onClick={() => patch(c.id, { images: c.images.filter((_, j) => j !== i) })}
                              className="absolute inset-0 flex items-center justify-center rounded bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                            >
                              <Trash2 className="size-5 text-white" />
                            </button>
                          )}
                        </span>
                      ))}
                      {multi && !c.images.length && <span className="text-gray-400">—</span>}
                      {multi && (
                        <label aria-label="Add images" className="cursor-pointer">
                          <Plus className="size-6 rounded-full bg-[#D9A91B] p-1 text-white" strokeWidth={4} />
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={async (e) => {
                              const files = [...(e.target.files ?? [])];
                              e.target.value = "";
                              const added = await readFiles(files);
                              save(c, { images: [...c.images, ...added] }, {}, files);
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {editing === c.id ? (
                      <input data-edit autoFocus defaultValue={c.name} className={field} onKeyDown={blurOnEnter} />
                    ) : (
                      c.name
                    )}
                  </td>
                  {extraLabels.map((l, i) => (
                    <td key={i} className="px-4 py-3">
                      {editing === c.id ? (
                        <input data-edit defaultValue={c.extras[i]} placeholder={l} className={field} onKeyDown={blurOnEnter} />
                      ) : (
                        c.extras[i]
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => save(c, { active: !c.active }, { status: c.active ? "inactive" : "active" })}
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        c.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {c.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="flex gap-3 px-4 py-3">
                    <button aria-label="Edit" onClick={() => setEditing(c.id)}>
                      <Pencil className="size-5 text-[#2F7BE8]" />
                    </button>
                    <button
                      aria-label="Delete"
                      onClick={() => remove(c)}
                    >
                      <Trash2 className="size-5 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">Nothing added yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
