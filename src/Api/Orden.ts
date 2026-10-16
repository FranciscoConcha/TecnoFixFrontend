import { apiFetch } from "./Client";
import type {
  RegistrarOrdenRequestDto,
  RegistrarOrdenResponseDto,
} from "../Types/Orden.Type";

export function registrarOrden(
  request: RegistrarOrdenRequestDto
): Promise<RegistrarOrdenResponseDto> {
  return apiFetch<RegistrarOrdenResponseDto>("/api/orden", {
    method: "POST",
    body: JSON.stringify(request),
  });
}