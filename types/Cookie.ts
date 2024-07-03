export interface Cookie {
	token: string
	expiryDate: Date
}

export interface AuthLoginResponse {
	accessToken: string
	refreshToken: string
	accessTokenExpiresIn: Date
	refreshTokenExpiresIn: Date
	userId: string
	message: string
}
