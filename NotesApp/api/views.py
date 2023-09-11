from django.shortcuts import render
#from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
#from .models import Note
#from .serializers import NoteSerializer
from .utils import getNotesList, createNote ,getNoteDetail, updateNote, deleteNote

@api_view(['GET'])

def getRoutes(request) :

    # Specify all the endpoints
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    #return JsonResponse(routes, safe = False)
    return Response(routes)


@api_view(['GET', 'POST'])
def getNotes(request) :
    
    if request.method == 'GET' :
        return getNotesList(request)

    if request.method == 'POST' : # Creating a new Note
        return createNote(request)
        

@api_view(['GET', 'PUT', 'DELETE'])
def getNote(request, pk) : # Single Note
    
    if request.method == 'GET' :
        return getNoteDetail(request, pk)
        
    if request.method == 'PUT' : # Update a Single Note
        return updateNote(request, pk)
        
    if request.method == 'DELETE' : # Delete a Particular Note 
        return deleteNote(request, pk)


#@api_view(['POST'])
#def createNote(request):
#    data = request.data
#    note = Note.objects.create(
#        body = data['body']
#    )
#    serializer = NoteSerializer(note, many = False)
#
#    return Response(serializer.data)


#@api_view(['PUT'])
#def updateNote(request, pk) : # Update a Single Note
#    data = request.data
#    note = Note.objects.get(id = pk)
#    serializer = NoteSerializer(instance = note, data = data, many = False) # We should not update until its valid so only 'instance = note' instead of just 'note'
#    
#    if serializer.is_valid():
#        serializer.save()
#
#    return Response(serializer.data)


#@api_view(['DELETE'])
#def deleteNote(request, pk) : # Delete a Particular Note 
#    note = Note.objects.get(id = pk)
#    note.delete()
#
#    return Response('Note was Deleted Successfully !!')
