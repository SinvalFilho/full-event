import { Request, Response } from "express";
import prisma from "../../prisma/db";

export class EventsController {

    public async getEvents(req: Request, res: Response) {
        try {
            const events = await prisma.event.findMany({});
            return res.json(events);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            return res.status(500).send("Erro ao buscar eventos.");
        }
    }

    public async createEvent(req: Request, res: Response) {
        const { title, description, imgURL, date, location, status } = req.body;

        // Verifica se o status fornecido é válido
        if (!['EM_BREVE', 'EM_ANDAMENTO', 'ENCERRADO'].includes(status)) {
            return res.status(400).json({ error: "Status inválido. Use 'EM_BREVE', 'EM_ANDAMENTO' ou 'ENCERRADO'." });
        }

        // Valida e formata a data
        if (!date || isNaN(Date.parse(date))) {
            return res.status(400).json({ error: "Data inválida. Certifique-se de usar o formato ISO-8601." });
        }

        // Obtém o ID do usuário autenticado do response.locals
        const createdById = res.locals.userId;

        // Verifica se o ID do usuário existe
        const userExists = await prisma.user.findUnique({
            where: { id: createdById },
        });

        if (!userExists) {
            return res.status(400).json({ error: "Usuário não encontrado." });
        }

        const existingEvent = await prisma.event.findFirst({
            where: { title: title },
        });

        if (existingEvent) {
            return res.status(400).send("Evento já existe!");
        }

        try {
            const event = await prisma.event.create({
                data: {
                    title,
                    description,
                    imgURL,
                    date: new Date(date).toISOString(), // Converte a string para ISO-8601
                    location,
                    status: status as 'EM_BREVE' | 'EM_ANDAMENTO' | 'ENCERRADO', // Cast para EventStatus
                    createdBy: {
                        connect: { id: createdById }, // Conecta o evento ao usuário
                    },
                },
            });
            return res.json(event);
        } catch (error) {
            console.error("Erro ao criar o evento:", error);
            return res.status(500).send("Erro ao criar evento.");
        }
    }

    public async getEventById(req: Request, res: Response) {
        const { id } = req.params;

        // Certifique-se de que o ID é um número válido
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: "ID inválido." });
        }

        try {
            const event = await prisma.event.findUnique({
                where: { id: numericId },
            });
            if (!event) {
                return res.status(404).json({ error: "Evento não encontrado." });
            }
            return res.json(event);
        } catch (error) {
            console.error("Erro ao buscar o evento:", error);
            return res.status(500).send("Erro ao buscar o evento.");
        }
    }

    public async updateEvent(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description, imgURL, date, location, status } = req.body;

        // Verificar se o status fornecido é válido
        if (status && !['EM_BREVE', 'EM_ANDAMENTO', 'ENCERRADO'].includes(status)) {
            return res.status(400).json({ error: "Status inválido. Use 'EM_BREVE', 'EM_ANDAMENTO' ou 'ENCERRADO'." });
        }

        // Valida e formata a data, se fornecida
        if (date && (isNaN(Date.parse(date)))) {
            return res.status(400).json({ error: "Data inválida. Certifique-se de usar o formato ISO-8601." });
        }

        // Certifique-se de que o ID é um número válido
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: "ID inválido." });
        }

        try {
            const event = await prisma.event.update({
                where: { id: numericId },
                data: {
                    title,
                    description,
                    imgURL,
                    date: date ? new Date(date).toISOString() : undefined, // Converte a string para ISO-8601, se fornecida
                    location,
                    status: status ? status as 'EM_BREVE' | 'EM_ANDAMENTO' | 'ENCERRADO' : undefined, // Cast para EventStatus
                },
            });
            return res.json(event);
        } catch (error) {
            console.error("Erro ao atualizar o evento:", error);
            return res.status(500).send("Erro ao atualizar evento.");
        }
    }

    public async deleteEvent(req: Request, res: Response) {
        const { id } = req.params;

        // Certifique-se de que o ID é um número válido
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: "ID inválido." });
        }

        try {
            await prisma.event.delete({
                where: { id: numericId },
            });
            return res.send("Evento deletado!");
        } catch (error) {
            console.error("Erro ao deletar o evento:", error);
            return res.status(500).send("Erro ao deletar evento.");
        }
    }
}
