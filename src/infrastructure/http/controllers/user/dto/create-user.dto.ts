import {z} from "zod";

const passwordSchema = z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .regex(/\d/, "A senha deve conter pelo menos um número.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial.");

const validUFs = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const ufSchema = z
    .string()
    .toUpperCase()
    .refine((uf) => validUFs.includes(uf), {
        message: "A UF deve ser válida, como SP, RJ, MG, etc.",
    })
    .optional();

const cpfPixRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjPixRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const phonePixRegex = /^\(?\d{2}\)? ?9\d{4}-?\d{4}$/;
const emailPixRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const randomKeyPixRegex = /^[a-zA-Z0-9]{1,32}$/;

const pixKeySchema = z
    .string()
    .refine(
        (key) =>
            cpfPixRegex.test(key) ||
            cnpjPixRegex.test(key) ||
            phonePixRegex.test(key) ||
            emailPixRegex.test(key) ||
            randomKeyPixRegex.test(key),
        {
            message: "A chave PIX deve ser um CPF, CNPJ, e-mail, telefone ou chave aleatória válida.",
        }
    )
    .optional();

export const CreateUserDto = z.object({
    name: z.string().min(4, "O nome deve ter pelo menos 4 caracteres").optional(),
    cpf: z.string().length(11).optional(),
    phone: z.string().min(9),
    email: z.string().email("O email informado não é válido").optional(),
    uf: ufSchema,
    pixKey: pixKeySchema,
    affiliateCode: z.string().optional(),
    password: passwordSchema,
    accountType: z.string(),
    userType: z.string(),
    status: z.string(),
})
.refine(
    (data) => data.email || data.cpf,
    {
        message: "É obrigatório informar o email ou o CPF",
        path: ["cpf", "email"],
    }
);
