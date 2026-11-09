import { useState } from 'react';

/** A multi-select list of interests. */
export function Page(): React.JSX.Element {
  const [interests, setInterests] = useState<string[]>([]);
  return (
    <main>
      <label>
        관심 분야{' '}
        <select
          multiple
          value={interests}
          onChange={(event) => {
            setInterests([...event.target.selectedOptions].map((option) => option.value));
          }}
        >
          <option value="여행">여행</option>
          <option value="음식">음식</option>
          <option value="운동">운동</option>
          <option value="음악">음악</option>
        </select>
      </label>
      <p role="status">{interests.join(', ')}</p>
    </main>
  );
}
