import Image from "next/image";

export default function Contactabt() {
  return (
    <div className="font-semibold">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Lockheed_Martin_logo_%282011%E2%80%932022%29.svg/1280px-Lockheed_Martin_logo_%282011%E2%80%932022%29.svg.png" alt="" className="h-8 w-auto" />
            </div>
            <div className="flex items-center space-x-8">
              <button className="text-gray-700 hover:text-blue-900 font-medium flex items-center">
                Who we are
              </button>
              <button className="text-gray-700 hover:text-blue-900 font-medium flex items-center">
                What we do
              </button>
              <button className="text-gray-700 hover:text-blue-900 font-medium">
                News
              </button>
              <button className="text-gray-700 hover:text-blue-900 font-medium flex items-center">
                Careers
              </button>
              <button className="text-gray-700 hover:text-blue-900 font-medium">
                Investors
              </button>
              <button className="text-gray-700 hover:text-blue-900 font-medium">
                Suppliers
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-900">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-120 w-full bg-gray-300">
        <img src="https://www.google.com/imgres?q=f35%20lockheed%20martin&imgurl=https%3A%2F%2Fnews.usni.org%2Fwp-content%2Fuploads%2F2017%2F06%2F2729938.jpg&imgrefurl=https%3A%2F%2Fnews.usni.org%2F2018%2F07%2F24%2F35291&docid=ep-XPXA76-53dM&tbnid=ofumjp8oveEkvM&vet=12ahUKEwjWw5KP5NySAxUZr1YBHYddA3AQnPAOegQIWRAB..i&w=6000&h=4000&hcb=2&ved=2ahUKEwjWw5KP5NySAxUZr1YBHYddA3AQnPAOegQIWRAB.jpg" alt="" className="absolute inset-0 w-full h-120 object-cover" />
      </div>
      <div className="bg-white h-screen w-full">

      </div>
    </div>
  );
}