import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { blogPosts } from "../../../data/content";
import { formatDate } from "../../../lib/format";
import { PageHeader, ConfirmDialog, Th, Td } from "../../components/AdminUI";
import { StatusBadge } from "../../../components/ui/Badge";

export default function BlogList() {
  const [posts, setPosts] = useState(blogPosts.map((p, i) => ({ ...p, status: i % 4 === 0 ? "Draft" : "Published" })));
  const [toDelete, setToDelete] = useState(null);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Blog"
        description={`${posts.length} articles`}
        action={<Link to="/admin/blog/new" className="btn-primary btn-sm"><Plus className="h-4 w-4" /> Add Article</Link>}
      />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-ink-900/8">
              <tr>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Author</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-900/6">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-sand-100/50">
                  <Td className="max-w-[280px]"><span className="line-clamp-1 font-semibold text-ink-900">{p.title}</span></Td>
                  <Td>{p.category}</Td>
                  <Td>{p.author}</Td>
                  <Td>{formatDate(p.date)}</Td>
                  <Td><StatusBadge status={p.status} /></Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/blog/${p.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-ink-900 hover:border-primary-700"><Pencil className="h-3.5 w-3.5" /></Link>
                      <button onClick={() => setToDelete(p)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-red-500 hover:border-red-300 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={() => setPosts((prev) => prev.filter((p) => p.id !== toDelete.id))} title="Delete this article?" description={toDelete ? `"${toDelete.title}" will be permanently removed.` : ""} />
    </div>
  );
}
