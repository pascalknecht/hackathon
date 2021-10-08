# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env

COPY ./common/ ./common

WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./api/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY ./api/ ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "exec", "api.dll"]