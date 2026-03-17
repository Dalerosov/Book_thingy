export function Sort_by(arr, order_by, direction) {
    const dir = direction === "DESC" ? -1 : 1;

    return [...arr].sort((a, b) => {
        if (order_by === "id")
            return (Number(a[order_by]) - Number(b[order_by])) * dir;

        if (order_by === "date_of_release")
            return (new Date(a[order_by]) - new Date(b[order_by])) * dir;

        return a[order_by].localeCompare(b[order_by]) * dir;
    });
}