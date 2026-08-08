import { EditProductClient } from "@/components/edit-product-client";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditProductClient id={id} />;
}
