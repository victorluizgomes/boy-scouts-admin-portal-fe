import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";

const PasswordPage: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();

  const hashedStoredPassword =
    "$2a$10$O4kiEk7rtDtjLW5.l3v.6O5fOIZwmUgtKyaGEi1ibHL7Y/X2yReum";

  const handleLogin = () => {
    if (bcrypt.compareSync(password, hashedStoredPassword)) {
      login();
    } else {
      alert("Wrong password!");
      setPassword("");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4">
        Atlanta Boy Scouts of America Web Admin Portal
      </h1>
      <p className="text-muted-foreground text-center text-xl mb-28">
        To access the portal please enter the admin password.
      </p>

      <div className="flex flex-col justify-center items-center w-full gap-4">
        <div className="w-[20rem] flex flex-col gap-4">
          <div className="grid w-[20rem] gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Enter Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin}>Enter</Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;
