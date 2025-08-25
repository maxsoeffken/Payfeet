import Composer from "@/components/Composer";

// ...
<Composer onCreate={async (text) => {
  // TODO: später an Supabase schicken
  console.log("Neuer Post:", text);
}} />
