
import React, { useState } from "react";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Check, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormValues } from "./AutomationFormSchema";

interface ContractMethodSelectorProps {
  form: UseFormReturn<FormValues>;
  contractMethods: { value: string; label: string }[];
}

const ContractMethodSelector = ({ form, contractMethods }: ContractMethodSelectorProps) => {
  const [customMethodInput, setCustomMethodInput] = useState(false);
  const [newCustomMethod, setNewCustomMethod] = useState("");
  
  const selectedMethods = form.watch("contractMethods") || [];
  
  const handleCustomMethodAdd = () => {
    if (newCustomMethod.trim()) {
      const updatedMethods = [...selectedMethods, newCustomMethod];
      form.setValue("contractMethods", updatedMethods);
      setNewCustomMethod("");
    }
  };

  const removeMethod = (method: string) => {
    const updatedMethods = selectedMethods.filter(m => m !== method);
    form.setValue("contractMethods", updatedMethods);
  };

  const getMethodLabel = (methodValue: string) => {
    const method = contractMethods.find(m => m.value === methodValue);
    return method ? method.label : methodValue;
  };

  return (
    <div className="space-y-3">
      <FormField
        control={form.control}
        name="contractMethods"
        render={() => (
          <FormItem>
            <FormLabel className="text-white">Contract Methods to Call</FormLabel>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-loteraa-black/50 border-loteraa-gray/30 text-white"
                  >
                    Select Methods
                    <span className="ml-auto opacity-70">
                      {selectedMethods.length > 0 ? `${selectedMethods.length} selected` : "None"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-full min-w-[220px] bg-loteraa-gray border-loteraa-gray/30 text-white"
                >
                  {contractMethods.map((method) => (
                    <DropdownMenuCheckboxItem
                      key={method.value}
                      checked={selectedMethods.includes(method.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue("contractMethods", [...selectedMethods, method.value]);
                          if (method.value === "custom") {
                            setCustomMethodInput(true);
                          }
                        } else {
                          form.setValue("contractMethods", selectedMethods.filter(m => m !== method.value));
                          if (method.value === "custom") {
                            setCustomMethodInput(false);
                          }
                        }
                      }}
                      className="cursor-pointer hover:bg-loteraa-black/30"
                    >
                      {method.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Selected methods display */}
      {selectedMethods.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedMethods.map((method) => (
            <Badge 
              key={method} 
              className="bg-loteraa-purple/80 hover:bg-loteraa-purple text-white flex items-center gap-1 py-1 px-2"
            >
              {getMethodLabel(method)}
              <button 
                type="button" 
                onClick={() => removeMethod(method)}
                className="ml-1 rounded-full hover:bg-loteraa-purple/50 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Custom method input */}
      {customMethodInput && (
        <div className="flex gap-2">
          <Input 
            placeholder="e.g. setThreshold(uint256)" 
            className="bg-loteraa-black/50 border-loteraa-gray/30 text-white flex-1" 
            value={newCustomMethod}
            onChange={(e) => setNewCustomMethod(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleCustomMethodAdd();
              }
            }}
          />
          <Button 
            type="button"
            onClick={handleCustomMethodAdd}
            className="bg-loteraa-purple hover:bg-loteraa-purple/90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContractMethodSelector;
