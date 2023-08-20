import httpx
#mainly to read the api call.
city = "China"
api_key = "94e9b90329af5893238a9ddb8df036b6"

api_url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={api_key}"

async def main():
    async with httpx.AsyncClient() as client:
        response = await client.get(api_url)
        data = response.json()

        # Access JSON values
        print(data)
        print(data.keys())

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())