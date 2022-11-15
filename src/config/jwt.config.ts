import dotenv from 'dotenv'

dotenv.config()

export const tokenConfig = {
  secretKey: process.env.JWT_SECRET_KEY as string
}
