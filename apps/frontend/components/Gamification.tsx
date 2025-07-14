import React from "react";

const Gamification: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Gamification & Rewards</h2>
      <div className="bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg p-4 border border-blue-200 dark:border-blue-800 shadow-sm flex items-center gap-2">
        <span className="text-2xl">💡</span>
        <span>Swap "Samsung 34(86.42cm) Odyssey G5 Curved Gaming Monitor" for suggested product to reduce carbon by <b>25%</b>!</span>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <span className="font-medium">Your Rewards</span>
        <div className="flex gap-3 flex-wrap">
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs shadow">🌟 Green Shopper</span>
          <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-xs shadow">🏅 1200 Points</span>
          <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs shadow">🎁 10% Discount</span>
        </div>
      </div>
    </div>
  );
};

export default Gamification; 