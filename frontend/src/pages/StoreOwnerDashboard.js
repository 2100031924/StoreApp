import React, { useState, useEffect } from "react";

const StoreOwnerDashboard = ({ storeId }) => {
    const [ratings, setRatings] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await fetch(`/api/stores/${storeId}/ratings`);
                const data = await response.json();
                setRatings(data);

                const totalRating = data.reduce((acc, rating) => acc + rating.rating, 0);
                const avg = data.length > 0 ? totalRating / data.length : 0;
                setAverageRating(avg.toFixed(1));
            } catch (error) {
                console.error("Error fetching ratings:", error);
            }
        };

        fetchRatings();
    }, [storeId]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Store Owner Dashboard</h2>
            <h3>Average Rating: ⭐ {averageRating}</h3>

            <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Rating</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {ratings.length > 0 ? (
                        ratings.map((rating) => (
                            <tr key={rating.id}>
                                <td>{rating.userName}</td>
                                <td>{rating.userEmail}</td>
                                <td>⭐ {rating.rating}</td>
                                <td>{rating.comment}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                No ratings available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StoreOwnerDashboard;
