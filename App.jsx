<div className="space-y-3">
  {Object.entries(stats.ageCounts).map(([age, count]) => {
    const percentage = ((count / (stats.totalPieces || 1)) * 100).toFixed(0);

    return (
      <div key={age}>
        <div className="flex justify-between text-[10px] font-black uppercase mb-1">
          <span>{age}</span>
          <span>{count} / {percentage}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: AGE_COLORS[age]
            }}
          />
        </div>
      </div>
    );
  })}
</div>