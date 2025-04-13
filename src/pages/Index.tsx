
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DateTimePicker } from '@/components/DateTimePicker';
import CountdownTimer from '@/components/CountdownTimer';
import { Play, Pause, Clock } from 'lucide-react';
import Image from '@/components/ui/image';

const Index = () => {
  const { toast } = useToast();
  const [targetDate, setTargetDate] = useState<Date>(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    return date;
  });
  
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  const handleStartCountdown = () => {
    if (targetDate.getTime() <= new Date().getTime()) {
      toast({
        variant: "destructive",
        title: "Invalid Date",
        description: "Please select a date and time in the future."
      });
      return;
    }
    
    setIsCountdownActive(true);
    setShowSettings(false);
    
    toast({
      title: "Countdown Started",
      description: `Counting down to ${targetDate.toLocaleString()}`
    });
  };

  const handleStopCountdown = () => {
    setIsCountdownActive(false);
    setShowSettings(true);
    
    toast({
      title: "Countdown Stopped",
      description: "You can now adjust the target date and time."
    });
  };

  const handleCountdownComplete = () => {
    toast({
      variant: "destructive",
      title: "Time's Up!",
      description: "The countdown has reached zero."
    });
    setIsCountdownActive(false);
    setShowSettings(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-black to-zinc-900">
      <div className="absolute top-4 left-4 flex space-x-4">
        <img 
          src="/placeholder.svg" 
          alt="Organizer Logo" 
          className="h-16 w-16 object-contain" 
        />
        <img 
          src="/favicon.ico" 
          alt="Competition Logo" 
          className="h-16 w-16 object-contain" 
        />
      </div>

      <div className="w-full max-w-5xl">
        {!isCountdownActive && showSettings ? (
          <Card className="bg-card border-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-4xl text-center">Suspenseful Countdown</CardTitle>
              <CardDescription className="text-center text-lg">
                Set your target date and time below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex flex-col space-y-2">
                  <label className="text-lg font-medium">Target Date & Time</label>
                  <DateTimePicker date={targetDate} setDate={setTargetDate} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                size="lg" 
                onClick={handleStartCountdown}
                className="bg-destructive hover:bg-destructive/90 text-white font-bold py-2 px-6 rounded-md"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Countdown
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={handleStopCountdown}
                className="bg-muted/50 hover:bg-muted border-muted-foreground/20"
              >
                <Pause className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="glass-effect p-16 rounded-xl bg-black/80 border border-white/10 shadow-2xl">
              <CountdownTimer 
                targetDate={targetDate} 
                onComplete={handleCountdownComplete} 
              />
            </div>
          </div>
        )}
      </div>
      
      {isCountdownActive && (
        <div className="mt-8 text-muted-foreground text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>Counting down to: {targetDate.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
