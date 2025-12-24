import CarDetails from "./CarDetails";


export default async function Page({ params }) {
  const { id } = await params; // unwrap the Promise

  return <CarDetails id={id} />;
}
