import React from 'react';

// Drizzle
import db from '@/lib/drizzle-agent';

async function fetchUserData() {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const result = await db.query.postsTable.findMany({
        with: {
            user: {
                columns: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    console.log(JSON.stringify(result, null, 2));
    return result;
}

const User = async () => {
    const user = await fetchUserData();

    return (
        <>
            { user.map(user => (
                <div key={user.id}>
                    <p>{user.title}</p>
                    <p>{user.content}</p>
                </div>
            ))}
        </>
    );
};

export default User;