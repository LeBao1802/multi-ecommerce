import { getPayload } from "payload";
import config from "@payload-config";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Mouse",
    color: "#FFB347",
    slug: "mouse",
    subcategories: [
      { name: "Logitech", slug: "logitech-mouse" },
      {
        name: "Corsair",
        slug: "corsair-mouse",
      },
      { name: "Razer", slug: "razer" },
      { name: "Pulsar", slug: "pulsar" },
      { name: "Rapoo", slug: "rapoo" },
      {
        name: "ASUS Mouse",
        slug: "asus-mouse",
      },
      { name: "Steelseries", slug: "steelseries" },
      { name: "Microsoft", slug: "microsoft" },
      { name: "Glorius", slug: "glorius" },
    ],
  },
  {
    name: "Keyboards",
    color: "#7EC8E3",
    slug: "keyboards",
    subcategories: [
      { name: "AKKO", slug: "akko" },
      { name: "AULA", slug: "aula" },
      { name: "DARE U", slug: "dare-u" },
      { name: "Durgod", slug: "durgod" },
      { name: "E Dra", slug: "e-dra" },
      { name: "Corsair Keyboard", slug: "corsair-keyboard" },
    ],
  },
  {
    name: "Monitors",
    color: "#D8B5FF",
    slug: "monitors",
    subcategories: [
      { name: "LG", slug: "lg" },
      { name: "ASUS Monitor", slug: "asus-monitor" },
      { name: "MSI Monitor", slug: "msi-monitor" },
      { name: "AOC Gaming", slug: "aoc" },
      { name: "ViewSonic", slug: "viewsonic" },
    ],
  },
  // {
  //   name: "Other",
  //   slug: "other",
  // },
  {
    name: "Speaker,Micro,Webcam",
    color: "#FFE066",
    slug: "hardwarepc",
    subcategories: [
      { name: "Speaker", slug: "speaker" },
      { name: "Webcam", slug: "webcam" },
      { name: "Microphone HyperX", slug: "micro" },
    ],
  },
  {
    name: "HD,Ram,SD",
    color: "#96E6B3",
    slug: "storage",
    subcategories: [
      { name: "Ram", slug: "ram" },
      { name: "SSD", slug: "ssd" },
      { name: "HDD", slug: "hdd" },
      { name: "SD USB", slug: "sd-usb" },
    ],
  },
  {
    name: "Case,Power,AIO",
    color: "#FF9AA2",
    slug: "casepc",
    subcategories: [
      { name: "Case ASUS", slug: "case-asus" },
      { name: "Case Corsair", slug: "case-corsair" },
      { name: "Case NZXT", slug: "case-nzxt" },
      { name: "Power 400W", slug: "power-400" },
      { name: "Power 500W", slug: "power-500" },
      { name: "Power 1000W", slug: "power-1000" },
      { name: "AIO 240mm", slug: "aio-240" },
      { name: "AIO 280mm", slug: "aio-280" },
      { name: "AIO 360mm", slug: "aio-380" },
      { name: "AIO 4200mm", slug: "aio-420" },
    ],
  },
  {
    name: "Main,CPU,VGA",
    color: "#B5B9FF",
    slug: "mainpc",
    subcategories: [
      { name: "VGA RTX 50 Series", slug: "vga" },
      { name: "Main Intel", slug: "main-intel" },
      { name: "Main AMD", slug: "main-amd" },
      { name: "CPU Intel", slug: "cpu-intel" },
      { name: "CPU AMD", slug: "cpu-amd" },
    ],
  },
  {
    name: "PC PreBuild",
    color: "#FFCAB0",
    slug: "pcprebuild",
    subcategories: [
      { name: "PC RTX 5090", slug: "pc-rtx-5090" },
      { name: "PC AMD R9", slug: "pc-amd-r9" },
      { name: "PC RX 6600", slug: "pc-rx-6600" },
      { name: "PC Core i9", slug: "pc-core-i9" },
      { name: "PC Core Ultra 9", slug: "pc-core-ultra9" },
    ],
  },
  {
    name: "Laptop Gaming",
    color: "#FFD700",
    slug: "laptopgaming",
    subcategories: [
      { name: "ACER PREDATOR", slug: "acer-predator" },
      { name: "ASUS ROG", slug: "asus-rog" },
      { name: "MSI Gaming", slug: "msi-laptopgaming" },
      { name: "Lenovo Gaming", slug: "lenovo-laptopgaming" },
      { name: "GIGABYTE AORUS", slug: "gigabyte" },
    ],
  },
  {
    name: "Laptop",
    color: "#FF6B6B",
    slug: "laptop",
    subcategories: [
      { name: "ASUS Laptop", slug: "asus-laptop" },
      { name: "ACER Laptop", slug: "acer-laptop" },
      { name: "MSI Laptop", slug: "msi-laptop" },
      { name: "LENOVO Laptop", slug: "lenovo-laptop" },
      { name: "DELL Laptop", slug: "dell-laptop" },
      { name: "HP Pavilion", slug: "hp" },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

// await seed();

// process.exit(0);

try {
  await seed();
  console.log("Seeding completed successfully");
  process.exit(0);
} catch (error) {
  console.log("Error during seeding", error);
  process.exit(1); // Exit with error code
}
