// Sends `id` instead of `_id`, so the frontend can keep using product.id
export const toJSONOptions = {
    versionKey: false,
    transform: (doc, ret) => {
        if (ret._id) {
            ret.id = ret._id.toString();
            delete ret._id;
        }
        delete ret.password;
        return ret;
    },
};
