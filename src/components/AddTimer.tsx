import { useRef } from "react";

import Button from "./UI/Button.tsx";
import Form, { FormHandle } from "./UI/Form.tsx";
import Input from "./UI/Input.tsx";
import { useTimersContext } from "../store/timer-context.tsx";

export default function AddTimer() {
  const form = useRef<FormHandle>(null);
  const { addTimer } = useTimersContext();
  function handleSaveTimer(data: unknown) {
    const extractedData = data as { name: string; duration: string };
    // const extractedData: {name: string; duration: string;} | +extractedDAta.duration
    // duration as string here and it should be number So =>  parseInt(extractedData.duration, 10) or
    addTimer({
      name: extractedData.name,
      duration: parseInt(extractedData.duration),
    });
    // console.log(extractedData);
    form.current?.clear();
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer">
      <Input type="text" label="Name" id="name" />
      <Input type="number" label="Duration" id="duration" />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  );
}
