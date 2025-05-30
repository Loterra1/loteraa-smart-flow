
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface AutomationTrigger {
  id: number;
  sensor: string;
  condition: string;
  action: string;
  status: "on" | "off";
  lastTriggered: string;
  hash?: string;
}

interface AutomationTriggersProps {
  isNewAccount?: boolean;
}

export default function AutomationTriggers({ isNewAccount = false }: AutomationTriggersProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [triggers, setTriggers] = useState<AutomationTrigger[]>([
    {
      id: 1,
      sensor: "Sensor A",
      condition: "If temp ≥ 30°C",
      action: "Trigger Contract",
      status: "on",
      lastTriggered: "25 min ago",
      hash: "0x8f2e...3d4f"
    },
    {
      id: 2,
      sensor: "Sensor B",
      condition: "If humidity < 40%",
      action: "Trigger Contract",
      status: "on",
      lastTriggered: "2 hours ago",
      hash: "0x7a1c...9e2b"
    },
    {
      id: 3,
      sensor: "Sensor C",
      condition: "If light = off",
      action: "Trigger Contract",
      status: "off",
      lastTriggered: "Yesterday"
    }
  ]);

  const handleCreateAutomation = () => {
    navigate('/automation');
  };

  const toggleTrigger = (triggerId: number) => {
    setTriggers(triggers.map(trigger => {
      if (trigger.id === triggerId) {
        const newStatus = trigger.status === "on" ? "off" : "on";
        toast({
          title: "Automation Updated",
          description: `${trigger.sensor} automation has been turned ${newStatus}`,
        });
        return { ...trigger, status: newStatus };
      }
      return trigger;
    }));
  };

  if (isNewAccount) {
    return (
      <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-white">Automation Triggers</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-loteraa-blue/10 flex items-center justify-center">
              <Zap className="h-8 w-8 text-loteraa-blue/50" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No automation rules yet</h3>
            <p className="text-white/70 mb-4 max-w-sm">
              Create automation rules to trigger smart contracts based on your device data.
            </p>
            <Button 
              onClick={handleCreateAutomation}
              className="bg-loteraa-blue hover:bg-loteraa-blue/90"
            >
              Create Your First Automation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">Automation Triggers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {triggers.map((trigger) => (
            <Card key={trigger.id} className={`border ${trigger.status === 'on' ? 'border-loteraa-purple/30 bg-loteraa-purple/5' : 'border-loteraa-gray/30 bg-loteraa-gray/30'}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">{trigger.sensor}</h4>
                    <p className="text-sm text-white/70 mt-1">{trigger.condition}</p>
                    <p className="text-sm text-white/70">{trigger.action}</p>
                  </div>
                  <button
                    onClick={() => toggleTrigger(trigger.id)}
                    className={`h-6 w-12 rounded-full flex items-center px-1 transition-all duration-200 ${
                      trigger.status === 'on' ? 'bg-loteraa-purple justify-end' : 'bg-loteraa-gray/50 justify-start'
                    }`}
                  >
                    <div className="h-4 w-4 rounded-full bg-white transition-all duration-200"></div>
                  </button>
                </div>
                <div className="mt-3 flex items-center text-xs text-white/50">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{trigger.lastTriggered}</span>
                </div>
                {trigger.hash && (
                  <div className="mt-2">
                    <a href={`https://etherscan.io/tx/${trigger.hash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-loteraa-purple hover:underline flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      {trigger.hash}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
