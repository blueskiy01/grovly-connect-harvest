import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const Messages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inbox');
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchMessages();
  }, [activeTab]);

  const fetchMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setLoading(true);
      const { data: messagesData, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(display_name),
          recipient:profiles!messages_recipient_id_fkey(display_name)
        `)
        .eq(activeTab === 'inbox' ? 'recipient_id' : 'sender_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(messagesData || []);
    } catch (error: any) {
      toast({
        title: "Error fetching messages",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId);

      if (error) throw error;
      
      // Update local state
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
    } catch (error: any) {
      toast({
        title: "Error marking message as read",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getInitials = (name?: string) => {
    return name
      ? name.split(' ').map(n => n[0]).join('').toUpperCase()
      : '?';
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 min-h-screen pt-24">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen pt-24">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <Tabs defaultValue="inbox" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No messages in your inbox</p>
          ) : (
            messages.map((message) => (
              <Card key={message.id} className={`${!message.read ? 'bg-muted/50' : ''}`}>
                <CardContent className="flex items-start gap-4 p-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(message.sender?.display_name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{message.sender?.display_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(message.created_at), 'PPp')}
                        </p>
                      </div>
                      {!message.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(message.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No sent messages</p>
          ) : (
            messages.map((message) => (
              <Card key={message.id}>
                <CardContent className="flex items-start gap-4 p-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(message.recipient?.display_name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div>
                      <p className="font-medium">To: {message.recipient?.display_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(message.created_at), 'PPp')}
                      </p>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;