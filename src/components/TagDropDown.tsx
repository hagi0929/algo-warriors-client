import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tag } from "../models/Tag";

interface TagDropdownProps {
  label: string;
  tags: Tag[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const TagDropdown: React.FC<TagDropdownProps> = ({ label, tags, selectedValue, onChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
        <DropdownMenuLabel>{`Available ${label}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedValue} onValueChange={onChange}>
          {tags.map(tag => (
            <DropdownMenuRadioItem key={tag.id} value={tag.content}>
              {tag.content}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TagDropdown;