import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2, Edit, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type PublicationType = "silahis" | "sidlak" | "cassayuran" | "motherboard" | "sindaw" | "adinfinitum" | "caduceus" | "thuum";

const PUBLICATIONS = [
  { id: "silahis", name: "SILAHIS" },
  { id: "sidlak", name: "SIDLAK" },
  { id: "cassayuran", name: "CASSAYURAN" },
  { id: "motherboard", name: "THE MOTHERBOARD" },
  { id: "sindaw", name: "SINDAW" },
  { id: "adinfinitum", name: "AD INFINITUM" },
  { id: "caduceus", name: "THE CADUCEUS" },
  { id: "thuum", name: "THE THU'UM" },
];

const Posts = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    publication_id: "" as PublicationType,
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "",
    facebook_url: "",
  });

  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (newPost: typeof formData) => {
      const { data, error } = await supabase
        .from("posts")
        .insert([{ ...newPost, author_type: "admin" }])
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully");
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Failed to create post: ${error.message}`);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: typeof formData }) => {
      const { data, error } = await supabase
        .from("posts")
        .update(updates)
        .eq("id", id)
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated successfully");
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Failed to update post: ${error.message}`);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to delete post: ${error.message}`);
    },
  });

  const resetForm = () => {
    setFormData({
      publication_id: "" as PublicationType,
      title: "",
      content: "",
      excerpt: "",
      author: "",
      category: "",
      facebook_url: "",
    });
    setEditingPost(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updatePostMutation.mutate({ id: editingPost.id, updates: formData });
    } else {
      createPostMutation.mutate(formData);
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      publication_id: post.publication_id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || "",
      author: post.author,
      category: post.category || "",
      facebook_url: post.facebook_url || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Posts</h1>
          <p className="text-muted-foreground">Create and manage publication posts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
              <DialogDescription>
                Add posts from Facebook pages or create custom announcements
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="publication">Publication</Label>
                <Select
                  value={formData.publication_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, publication_id: value as PublicationType })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select publication" />
                  </SelectTrigger>
                  <SelectContent>
                    {PUBLICATIONS.map((pub) => (
                      <SelectItem key={pub.id} value={pub.id}>
                        {pub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook Post URL (Optional)</Label>
                <Input
                  id="facebook_url"
                  placeholder="https://facebook.com/..."
                  value={formData.facebook_url}
                  onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Paste a Facebook post URL to embed it in the feed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                <Input
                  id="excerpt"
                  placeholder="Short summary..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Input
                    id="category"
                    placeholder="News, Event, etc."
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading posts...</p>
      ) : (
        <div className="grid gap-4">
          {posts?.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription>
                      {PUBLICATIONS.find((p) => p.id === post.publication_id)?.name} • By{" "}
                      {post.author}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deletePostMutation.mutate(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {post.facebook_url && (
                  <p className="text-sm text-muted-foreground mb-2">
                    🔗 Facebook: {post.facebook_url}
                  </p>
                )}
                <p className="text-sm">{post.excerpt || post.content.substring(0, 150)}...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
