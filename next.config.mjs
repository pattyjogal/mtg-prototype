/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [

            {
                protocol: "https",
                hostname: "iy7qcmpt01rkuswr.public.blob.vercel-storage.com",
                port: "",
                pathname: "/card_art/**",
            },

        ]
    }
};

export default nextConfig;
