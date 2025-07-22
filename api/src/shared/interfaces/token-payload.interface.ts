import { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  branchId?: string;
  userId: string;
  username: string;
  jti: string;
}

export default TokenPayload;
