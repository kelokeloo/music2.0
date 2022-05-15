import { Outlet } from "react-router-dom";
export function BaseViewFrame() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}
