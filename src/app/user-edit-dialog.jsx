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
import React, { useEffect, useState } from "react";

export const UserEditDialog = ({ open, setCreateModalOpen, item }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (item) {
      setFirstName(item.firstname);
      setLastName(item.lastname);
      setEmail(item.email);
    }
  }, [item, open]);

  const edit = async () => {
    const res = await fetch(`api/users/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        imageUrl: "http://dummyimage.com/223x147.png/ff4444/ffffff",
      }),
    });
    console.log(res);
    setCreateModalOpen(false);
  };

  console.log({ firstName, lastName, email });
  return (
    <Dialog open={open} onOpenChange={setCreateModalOpen}>
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
          <Button onClick={edit} type="submit">
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
