import { useAppDispatch, useAppSelector } from "@/hooks";
import { increment, selectCount } from "../counter.slice";

export const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>{count}</button>
    </div>
  );
};
