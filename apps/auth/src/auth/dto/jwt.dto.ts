export interface JwtDto {
  userId: string;
  /**
   * Issued at
   */
  iat: string;
  /**
   * Expiration time
   */
  exp: number;
}
