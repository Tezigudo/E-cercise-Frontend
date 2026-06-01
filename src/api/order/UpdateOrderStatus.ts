import API from "../index.ts";

export const updateOrderStatus = async (id: string | undefined) => {
    const response = await API.put(`/order/status/${id}`);
    return response.data;
}