<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <h2 class="text-4xl font-bold text-gray-800">Choose Your Package</h2>
    <p class="mt-2 text-gray-600">Select a package that suits your needs.</p>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-6">
      <div v-for="pkg in packages" :key="pkg.id" class="bg-white shadow-lg rounded-lg p-6 text-center border">
        <h3 class="text-2xl font-semibold">{{ pkg.name }}</h3>
        <p class="mt-2 text-gray-600">{{ pkg.description }}</p>
        <p class="mt-4 text-4xl font-bold text-green-600">${{ pkg.price }}</p>
        <button class="mt-6 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600" @click="selectPackage(pkg)">
          Select
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { usePackage } from "@/compositions/subcription";

export default {
  setup() {
    const { packages, selectPackage } = usePackage();
    return { packages, selectPackage };
  },
};
</script>
