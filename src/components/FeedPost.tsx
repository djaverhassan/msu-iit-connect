import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface FeedPostProps {
  author: string;
  authorType: "publication" | "admin";
  avatar?: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  facebookUrl?: string;
}

export const FeedPost = ({ author, authorType, avatar, timestamp, content, image, likes, comments, facebookUrl }: FeedPostProps) => {
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
            <h4 className="font-semibold text-foreground text-sm">{author}</h4>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Content */}
      <p className="text-sm text-foreground mb-3 whitespace-pre-wrap">{content}</p>

      {/* Facebook Link if exists */}
      {facebookUrl && (
        <a 
          href={facebookUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline inline-flex items-center gap-1 mb-3"
        >
          View on Facebook →
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
        <span>{likes} likes</span>
        <span>{comments} comments</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="flex-1 gap-2 hover:text-primary">
          <Heart className="h-4 w-4" />
          <span className="text-xs">Like</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 gap-2 hover:text-primary">
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs">Comment</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 gap-2 hover:text-primary">
          <Share2 className="h-4 w-4" />
          <span className="text-xs">Share</span>
        </Button>
      </div>
    </Card>
  );
};
