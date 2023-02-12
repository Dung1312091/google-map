import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";

type DrawType = "Marker" | "Polygon" | "Polyline";
type ControlField = {
  name: string;
  type: string;
  placeHolder: string;
  label: string;
};
type ControlType = Record<DrawType, ControlField[]>;

const CONTROLS: ControlType = {
  Marker: [
    {
      name: "location",
      label: "Location ",
      type: "text",
      placeHolder: "Enter Location",
    },
    {
      name: "lat",
      label: "Latitude",
      type: "number",
      placeHolder: "Enter latitude",
    },
    {
      name: "lng",
      label: "Longitude ",
      type: "number",
      placeHolder: "Enter longitude",
    },
  ],
  Polygon: [
    {
      name: "lat1",
      label: "Latitude 1",
      type: "number",
      placeHolder: "Enter latitude",
    },
    {
      name: "lng1",
      label: "Longitude 1",
      type: "number",
      placeHolder: "Enter longitude",
    },
    {
      name: "lat2",
      label: "Latitude 2",
      type: "number",
      placeHolder: "Enter latitude",
    },
    {
      name: "lng2",
      type: "number",
      label: "Longitude 2",
      placeHolder: "Enter longitude",
    },
    {
      name: "lat3",
      label: "Latitude 3",
      type: "number",
      placeHolder: "Enter latitude",
    },
    {
      name: "lng3",
      label: "Longitude 3",
      type: "number",
      placeHolder: "Enter longitude",
    },
  ],
  Polyline: [
    {
      name: "lat1",
      label: "Latitude 1",
      type: "number",
      placeHolder: "Enter latitude",
    },
    {
      name: "lng1",
      label: "Longitude 1",
      type: "number",
      placeHolder: "Enter longitude",
    },
    {
      name: "lat2",
      label: "Latitude 2",
      type: "number",
      placeHolder: "Enter latitude",
    },
    {
      name: "lng2",
      label: "Longitude 2",
      type: "number",
      placeHolder: "Enter longitude",
    },
    {
      name: "lat3",
      label: "Latitude 3",
      type: "number",
      placeHolder: "Enter latitude",
    },
    {
      name: "lng3",
      label: "Longitude 3",
      type: "number",
      placeHolder: "Enter longitude",
    },
  ],
};
export type OnDrawData = {
  type: DrawType;
  position: string;
  [k: string]: string;
};
interface DrawProps {
  onDraw: (data: OnDrawData) => void;
}
export default function Draw({ onDraw }: DrawProps) {
  const { register, handleSubmit, reset } = useForm();
  const [drawType, setDrawType] = useState<DrawType>("Marker");

  const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDrawType(e.target?.value as DrawType);
  };

  const onSubmit = (data: any) => {
    onDraw({
      type: drawType,
      ...data,
    });
    reset();
  };

  return (
    <form
      className="container mx-auto w-[40%] p-6 shadow sm:overflow-hidden sm:rounded-md bg-slate-400"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          className="w-60 h-9  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={handleSelectType}
        >
          <option value="Marker">Marker</option>
          <option value="Polygon">Polygon</option>
          <option value="Polyline">Polyline</option>
        </select>
      </div>
      <div className="grid grid-cols-2">
        {CONTROLS[drawType].map((control) => {
          return (
            <div key={control.name} className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                {control.label}
              </label>
              <input
                type={control.type}
                autoComplete="off"
                className="w-60 mt-1 block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={control.placeHolder}
                step="any"
                {...register(control.name, {
                  required: true,
                })}
              />
            </div>
          );
        })}
      </div>
      <button
        type="submit"
        className="block w-52 mx-auto mt-8 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save
      </button>
    </form>
  );
}
