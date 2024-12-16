import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export const UserCreateDialog = ({ open, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async () => {
    const res = await fetch("api/users", {
      method: "POST",
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        imageUrl: "http://dummyimage.com/223x147.png/ff4444/ffffff",
      }),
    });

    console.log(res);
    onClose(false);
    setEmail("");
    setFirstName("");
    setLastName("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">First name</Label>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              id="firstName"
              placeholder="Pedro Duarte"
              value={firstName}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Last name</Label>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              id="lastName"
              placeHolder="@peduarte"
              value={lastName}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              value={email}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onClose(false)}
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <Button onClick={addUser} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
