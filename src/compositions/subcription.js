import { ref } from "vue";
import { useRouter } from "vue-router";

export function usePackage() {
  const router = useRouter();
  const packages = ref([
    { id: 1, name: "Primary", description: "Basic package", price: 100 },
    { id: 2, name: "Silver", description: "Welcome Silver", price: 400 },
    { id: 3, name: "Gold", description: "Premium package with benefits", price: 800 },
  ]);

  const selectPackage = (pkg) => router.push({ name: "checkout", query: pkg });

  return { packages, selectPackage };
}
