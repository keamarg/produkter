import { shallowMount } from "@vue/test-utils";
import CarouselSlider from "@/components/CarouselSlider.vue";

describe("CarouselSlider.vue", () => {
  let wrapper;
  const mockProducts = [
    {
      id: 1,
      997: [{ featured: "slider" }],
      245: ["Product Title 1"],
      100: ["Author 1"],
      700: ["Author 2", "Author 3"],
    },
    {
      id: 2,
      997: [{ featured: "slider" }],
      245: ["Product Title 2"],
      100: ["Author 1"],
      700: ["Author 2", "Author 3"],
    },
    {
      id: 3,
      997: [{ featured: "slider" }],
      245: ["Product Title 3"],
      100: ["Author 1"],
      700: ["Author 2", "Author 3"],
    },
  ];

  beforeEach(() => {
    wrapper = shallowMount(CarouselSlider, {
      propsData: { products: mockProducts, loading: false },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the correct number of carousel items", () => {
    const carouselItems = wrapper.findAll(".carousel-item");
    expect(carouselItems.length).toBe(mockProducts.length);
  });

  it("renders product titles and authors correctly", () => {
    const carouselCaptions = wrapper.findAll(".carousel-caption");
    carouselCaptions.forEach((caption) => {
      const title = caption.find("h5").text();
      const product = mockProducts.find((p) => p[245][0] === title);

      expect(caption.text()).toContain(product[245][0]);
      expect(caption.text()).toContain(product[100][0]);
      expect(caption.text()).toContain(product[700].slice(1).join(", "));
    });
  });
});
