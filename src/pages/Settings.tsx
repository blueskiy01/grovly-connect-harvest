import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
    fetchNotifications();
  }, []);

  const fetchMessages = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:profiles!sender_id(display_name)')
      .eq('recipient_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
      return;
    }

    setMessages(data || []);
  };

  const fetchNotifications = async () => {
    // This would be replaced with actual notifications data
    // For now using mock data
    setNotifications([
      {
        id: 1,
        title: "New Interest",
        message: "Your garlic listing received 5 new interests!",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Resource Request",
        message: "A consumer has requested coffee grounds.",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const toggleEmailNotifications = async () => {
    setEmailNotifications(!emailNotifications);
    toast({
      title: "Settings Updated",
      description: `Email notifications ${!emailNotifications ? 'enabled' : 'disabled'}`,
    });
  };

  return (
    <div>
      <Navigation />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-4 text-gray-600">Manage your account settings and preferences.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={toggleEmailNotifications}
                />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="border-b pb-2">
                        <p className="font-medium">{message.sender.display_name}</p>
                        <p className="text-sm text-gray-600">{message.content}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(message.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No messages yet</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="border-b pb-2">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(notification.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No notifications yet</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;