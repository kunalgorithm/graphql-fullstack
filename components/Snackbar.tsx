import React, { useState, useEffect } from "react";

export default ({ message }: { message: string }) => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return open && <div>{message}</div>;
};
