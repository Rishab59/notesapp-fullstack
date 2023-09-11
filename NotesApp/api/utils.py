from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer


def getNotesList(request) :
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many = True) # 'many = True' is used to serialize more than one objects

    return Response(serializer.data)


def createNote(request) :
    data = request.data
    note = Note.objects.create(
        body = data['body']
    )
    serializer = NoteSerializer(note, many = False) # 'many = False' is used to serialize only one objects that's requested

    return Response(serializer.data)


def getNoteDetail(request, pk) :
    notes = Note.objects.get(id = pk)
    serializer = NoteSerializer(notes, many = False)

    return Response(serializer.data)
    

def updateNote(request, pk) :
    data = request.data
    note = Note.objects.get(id = pk)
    serializer = NoteSerializer(instance = note, data = data, many = False) # We should not update until its valid so only 'instance = note' instead of just 'note'

    if serializer.is_valid() :
        serializer.save()

    return Response(serializer.data)


def deleteNote(request, pk) :
    note = Note.objects.get(id = pk)
    note.delete()

    return Response('Note was Deleted Successfully !!')