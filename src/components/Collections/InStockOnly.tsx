import { Switch } from '../Util/Switch';

import { useState } from 'react';

export default function InStockOnly() {
  const [isSwitched, setSwitched] = useState(false);

  return (
    <div className="w-full border-b border-zinc-400 py-3">
      <div className="group flex cursor-pointer items-center justify-between px-2 py-2">
        <span className="tracking-tighter">In Stock Only</span>

        <Switch
          onClick={() => {
            setSwitched(!isSwitched);
          }}
        />
      </div>
    </div>
  );
}
