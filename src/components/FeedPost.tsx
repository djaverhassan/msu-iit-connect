import { Heart, MessageCircle, Share2, MoreVertical, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
          className="flex items-center gap-2 p-3 mb-3 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
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
