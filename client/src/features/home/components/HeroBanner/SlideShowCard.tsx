import ModelImage from '../../assets/model-banner-1.png';
import ModelImage_alt from '../../assets/model-banner-3.png';
import ModelDetailImage from '../../assets/model-banner-2-closeup.png';

export const FirstSlideShowCard = () => {
  return (
    <div className="relative flex min-h-[600px] w-full overflow-hidden rounded-3xl bg-[#f2ebd9] text-[#FF4500]">
      <div className="absolute top-4 right-4 left-4 flex justify-between text-[0.3rem] uppercase">
        <div className="tracking-tight">
          <div className="flex flex-col">
            <span>New ERA</span>
            <span>New EXPERIENCE</span>
            <span>2025-2026</span>
          </div>
        </div>
      </div>

      {/* Text Sections */}
      <div className="absolute top-4 right-4 left-25 flex justify-between text-xs uppercase">
        <div className="flex gap-5 tracking-tight">
          <div className="flex flex-col">
            <span>Experience THE</span>
            <span>LOCAL SCENE.</span>
          </div>
          <div className="flex flex-col">
            <span>DISCOVER YOURSELF</span>
            <span>IN LOCAL CULTURE.</span>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div className="font-anton absolute bottom-4 left-4 transform">
        <h1 className="text-8xl leading-none font-bold md:text-[11rem]">
          NATIVE
          <br />
          EXCLUSIVES
        </h1>
      </div>

      {/* Person Image Placeholder */}
      <div className="absolute top-1/2 right-1/12 h-full w-1/2 -translate-y-1/2 transform">
        <img
          src={ModelImage}
          alt="Model"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Up right Text */}
      <div className="absolute top-4 right-4 flex gap-4 text-xs tracking-wider uppercase">
        <span>Shop native.</span>
        <span>shop local</span>
        <div className="flex flex-col">
          <span>DISCOVER your fav brands</span>
          <span>More—All in One Place..</span>
        </div>
      </div>

      {/* Date */}
      <div className="absolute right-4 bottom-4 flex flex-col text-xs tracking-wider uppercase">
        <span>03</span>
        <span>2025</span>
      </div>
    </div>
  );
};

export const SmallFirstSlideShowCard = () => {
  return (
    <div className="relative flex min-h-[750px] w-full flex-col overflow-hidden rounded-3xl bg-[#f2ebd9] p-6 text-[#FF4500]">
      <div className="absolute top-4 right-4 left-4 flex justify-between text-[0.3rem] uppercase">
        <div className="tracking-tight">
          <div className="flex flex-col">
            <span>New ERA</span>
            <span>New EXPERIENCE</span>
            <span>2025-2026</span>
          </div>
        </div>
      </div>

      {/* Text Sections */}
      <div className="absolute top-4 right-4 left-25 flex justify-between text-[0.6rem] uppercase">
        <div className="flex gap-5 tracking-tight">
          <div className="flex flex-col">
            <span>Experience THE</span>
            <span>LOCAL SCENE.</span>
          </div>
          <div className="flex flex-col">
            <span>DISCOVER YOURSELF</span>
            <span>IN LOCAL CULTURE.</span>
          </div>
        </div>
      </div>

      {/* Person Image Placeholder */}
      <div className="absolute top-3/5 -right-1/8 h-full w-full -translate-y-1/2 transform">
        <img
          src={ModelImage}
          alt="Model"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Main Title */}
      <div className="font-anton absolute bottom-4 left-4 transform">
        <h1 className="text-[8rem] leading-none font-bold">
          NATIVE
          <br />
          EXCLUSIVES
        </h1>
      </div>

      {/* Up right Text */}
      <div className="absolute top-4 right-4 flex gap-4 text-[0.6rem] tracking-wider uppercase">
        <div className="flex flex-col">
          <span>Shop native.</span>
          <span>shop local</span>
        </div>

        <div className="flex flex-col">
          <span>DISCOVER your fav brands</span>
          <span>More—All in One Place..</span>
        </div>
      </div>

      {/* Date */}
      <div className="absolute right-4 bottom-1/3 flex flex-col text-xs tracking-wider uppercase">
        <span>03</span>
        <span>2025</span>
      </div>
    </div>
  );
};

export const SecondSlideShowCard = () => {
  return (
    <div className="relative flex min-h-[600px] w-full overflow-hidden rounded-3xl bg-[#f2ebd9] text-[#f2ebd9]">
      {/* Top Section */}
      <div className="absolute top-0 right-0 left-0 flex justify-between p-4 text-xs tracking-wider text-black uppercase">
        <div className="flex space-x-4">
          <span>ShOP Twenty four Seven</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Image */}
        <div className="relative w-1/2">
          <img
            src={ModelImage_alt}
            alt="Model"
            className="absolute -top-20 -left-10 h-[500px] w-full object-cover object-top"
          />
        </div>

        {/* Right Image and Text */}
        <div className="relative w-1/2">
          {/* Partial Model Detail */}
          <img
            src={ModelDetailImage}
            alt="Model Detail"
            className="absolute -top-16 right-55 h-[500px] w-full scale-90 object-cover object-top"
          />

          {/* Price Text */}
          <div className="font-anton absolute top-4 right-4 text-2xl text-black">
            <span>STARTING FROM</span>
            <div className="text-8xl tracking-tight">300 EGP</div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-black">
        <div className="container mx-auto flex flex-col items-center py-4">
          <span className="font-anton text-[10rem] leading-none uppercase">
            END OF SEASON SALE
          </span>

          {/* Brands List */}
          <div className="columns-2 space-y-2 self-start px-10 text-[8px] tracking-wider uppercase">
            <div>Vealty</div>
            <div>Sixteen</div>
            <div>Normadic</div>
            <div>Antidote</div>
            <div>Zecure</div>
            <div>Vertex</div>
            <div>Altitude</div>
            <div>Rhythm</div>
            <div>Eclipse</div>
            <div>Urban Edge</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SmallSecondSlideShowCard = () => {
  return (
    <div className="relative flex min-h-[750px] w-full flex-col overflow-hidden rounded-3xl bg-[#f2ebd9] p-6 text-[#f2ebd9]">
      {/* Top Section */}
      <div className="absolute top-0 right-0 left-0 flex justify-between p-4 text-xs tracking-wider text-black uppercase">
        <div className="flex space-x-4">
          <span>ShOP Twenty four Seven</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Image */}
        <div className="relative w-1/2">
          <img
            src={ModelImage_alt}
            alt="Model"
            className="absolute -top-5 left-0 h-[80%] w-full object-cover object-top"
          />
        </div>

        {/* Right Image and Text */}
        <div className="relative w-1/2">
          {/* Price Text */}
          <div className="font-anton absolute top-4 right-4 text-2xl text-black">
            <span className="text-[3.2rem] tracking-tight">STARTING FROM</span>
            <div className="text-8xl tracking-tight">300 EGP</div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-black">
        <div className="container mx-auto flex flex-col items-center py-4">
          {/* Brands List */}
          <div className="columns-2 space-y-2 self-start px-10 text-[8px] tracking-wider uppercase">
            <div>1.Vealty</div>
            <div>2.Sixteen</div>
            <div>3.Normadic</div>
            <div>4.Antidote</div>
            <div>5.Zecure</div>
            <div>6.Vertex</div>
            <div>7.Altitude</div>
            <div>8.Rhythm</div>
            <div>9.Eclipse</div>
            <div>10.Urban Edge</div>
          </div>
          <span className="font-anton text-[8rem] leading-none uppercase">
            END OF <br />
            SEASON SALE
          </span>
        </div>
      </div>
    </div>
  );
};
