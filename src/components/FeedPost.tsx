import { Heart, MessageCircle, Share2, MoreVertical, Facebook, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    display_name: string | null;
  };
}

interface FeedPostProps {
  id: string;
  author: string;
  authorType: "publication" | "admin";
  avatar?: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  facebookUrl?: string;
  publicationId?: string;
}

const publicationLabels: Record<string, string> = {
  silahis: "Silahis",
  sidlak: "Sidlak",
  cassayuran: "Cassayuran",
  motherboard: "Motherboard",
  sindaw: "Sindaw",
  adinfinitum: "Ad Infinitum",
  caduceus: "Caduceus",
  thuum: "Thuum",
};

export const FeedPost = ({ 
  id,
  author, 
  authorType, 
  avatar, 
  timestamp, 
  content, 
  image, 
  likes, 
  comments, 
  facebookUrl,
  publicationId 
}: FeedPostProps) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [commentCount, setCommentCount] = useState(comments);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has liked this post
  useEffect(() => {
    if (user) {
      checkIfLiked();
    }
  }, [user, id]);

  // Subscribe to realtime updates for this post's likes and comments
  useEffect(() => {
    const likesChannel = supabase
      .channel(`post-likes-${id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_likes',
          filter: `post_id=eq.${id}`
        },
        () => {
          fetchLikeCount();
          if (user) checkIfLiked();
        }
      )
      .subscribe();

    const commentsChannel = supabase
      .channel(`post-comments-${id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_comments',
          filter: `post_id=eq.${id}`
        },
        () => {
          fetchCommentCount();
          if (showComments) fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(likesChannel);
      supabase.removeChannel(commentsChannel);
    };
  }, [id, user, showComments]);

  const checkIfLiked = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', id)
      .eq('user_id', user.id)
      .maybeSingle();
    setIsLiked(!!data);
  };

  const fetchLikeCount = async () => {
    const { count } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', id);
    setLikeCount(count || 0);
  };

  const fetchCommentCount = async () => {
    const { count } = await supabase
      .from('post_comments')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', id);
    setCommentCount(count || 0);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from('post_comments')
      .select(`
        id,
        content,
        created_at,
        user_id
      `)
      .eq('post_id', id)
      .order('created_at', { ascending: true });
    
    if (data) {
      // Fetch profiles separately
      const userIds = [...new Set(data.map(c => c.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name')
        .in('user_id', userIds);
      
      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      
      const commentsWithProfiles = data.map(comment => ({
        ...comment,
        profiles: profileMap.get(comment.user_id) || { display_name: 'User' }
      }));
      
      setCommentsList(commentsWithProfiles);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to like posts");
      return;
    }

    setIsLoading(true);
    try {
      if (isLiked) {
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', id)
          .eq('user_id', user.id);
        setIsLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        await supabase
          .from('post_likes')
          .insert({ post_id: id, user_id: user.id });
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      toast.error("Failed to update like");
    }
    setIsLoading(false);
  };

  const handleComment = async () => {
    if (!user) {
      toast.error("Please log in to comment");
      return;
    }

    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('post_comments')
        .insert({ 
          post_id: id, 
          user_id: user.id, 
          content: newComment.trim() 
        });
      
      if (error) throw error;
      
      setNewComment("");
      setCommentCount(prev => prev + 1);
      fetchComments();
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
    }
    setIsLoading(false);
  };

  const toggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  const handleShare = async () => {
    const shareUrl = facebookUrl || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: author,
          text: content.substring(0, 100),
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <Card className="p-4 border border-border">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {author.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground text-sm">{author}</h4>
              {publicationId && publicationLabels[publicationId] && (
                <Badge variant="secondary" className="text-xs">
                  {publicationLabels[publicationId]}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Content */}
      <p className="text-sm text-foreground mb-3 whitespace-pre-wrap line-clamp-4">{content}</p>

      {/* Facebook Embed Link */}
      {facebookUrl && (
        <a 
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-3 mb-3 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors w-full text-left"
        >
          <Facebook className="h-5 w-5 text-[#1877F2]" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">View on Facebook</p>
            <p className="text-xs text-muted-foreground truncate">{facebookUrl}</p>
          </div>
        </a>
      )}

      {/* Image if exists */}
      {image && (
        <div className="mb-3 rounded-lg overflow-hidden">
          <img src={image} alt="Post content" className="w-full h-auto" />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 pt-2 border-t border-border">
        <span>{likeCount} likes</span>
        <span>{commentCount} comments</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex-1 gap-2 ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-primary'}`}
          onClick={handleLike}
          disabled={isLoading}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          <span className="text-xs">{isLiked ? 'Liked' : 'Like'}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex-1 gap-2 ${showComments ? 'text-primary' : 'hover:text-primary'}`}
          onClick={toggleComments}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs">Comment</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex-1 gap-2 hover:text-primary"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          <span className="text-xs">Share</span>
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-border">
          {/* Comment Input */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleComment()}
              className="flex-1"
            />
            <Button 
              size="sm" 
              onClick={handleComment}
              disabled={isLoading || !newComment.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Comments List */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {commentsList.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-2">No comments yet. Be the first!</p>
            ) : (
              commentsList.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                      {(comment.profiles?.display_name || 'U').charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-secondary/30 rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-foreground">
                        {comment.profiles?.display_name || 'User'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(comment.created_at), "MMM d, h:mm a")}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
