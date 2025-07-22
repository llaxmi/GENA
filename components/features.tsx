const features = [
  {
    title: "AI Powered Learning",
    iconBg: "bg-blue-100",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" fill="#3B82F6" />
        <text x="7" y="17" fontSize="12" fill="#fff">
          🤖
        </text>
      </svg>
    ),
  },
  {
    title: "Quick Revision",
    iconBg: "bg-purple-100",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" fill="#8B5CF6" />
        <text x="7" y="17" fontSize="12" fill="#fff">
          🔄
        </text>
      </svg>
    ),
  },
  {
    title: "Distraction Free ",
    iconBg: "bg-cyan-100",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" fill="#06B6D4" />
        <text x="7" y="17" fontSize="12" fill="#fff">
          🚫
        </text>
      </svg>
    ),
  },
  {
    title: "Customizable",
    iconBg: "bg-red-100",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" fill="#EF4444" />
        <text x="7" y="17" fontSize="12" fill="#fff">
          🎨
        </text>
      </svg>
    ),
  },
  {
    title: "Smart Flashcards",
    iconBg: "bg-yellow-100",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" fill="#F59E0B" />
        <text x="7" y="17" fontSize="12" fill="#fff">
          📚
        </text>
      </svg>
    ),
  },
  {
    title: "Multiformat Support",
    iconBg: "bg-indigo-100",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" fill="#7F3DFF" />
        <text x="7" y="17" fontSize="12" fill="#fff">
          📄
        </text>
      </svg>
    ),
  },
];

const Features = () => (
  <div className=" bg-blue-50/30 font-secondary">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto py-10">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className={`rounded-2xl shadow-md p-2 flex items-center  min-w-[300px] min-h-[100px] gap-x-2 ${feature.iconBg} `}
        >
          <div className={`rounded-xl p-2 ${feature.iconBg}`}>
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold">{feature.title}</h3>
        </div>
      ))}
    </div>
  </div>
);

export default Features;
