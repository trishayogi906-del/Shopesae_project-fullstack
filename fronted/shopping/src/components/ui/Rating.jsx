import { StarIcon } from "./Icons";

export default function Rating({ value }) {
    return (
        <span className="inline-flex items-center gap-1 text-xs text-stone-600">
            <StarIcon className="h-3.5 w-3.5 text-amber-500" />
            {value.toFixed(1)}
        </span>
    );
}
