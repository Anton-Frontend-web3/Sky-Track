import { useAppSelector } from '@/hooks/useAppSelector'
import { useCurrentFlight } from '@/hooks/useCurrentFlight'
import { useEffect, useRef } from 'react'
import type { MapRef } from 'react-map-gl/maplibre'
import { Outlet } from 'react-router-dom'
import { Header } from './flight-header/Header'
import { SkyTrackMap } from './skyTrackMap/skyTrackMap'
import { Toaster } from './ui/sonner'

export function Layout() {
	const { lastAction, triggerId } = useAppSelector(state => state.map)
	const { flight: selectedFlight } = useCurrentFlight()
	const mapRef = useRef<MapRef>(null)
	const handleFollow = () => {
		if (!mapRef.current || !selectedFlight) return;
		
		const progress = selectedFlight.progress / 100
		const lat = selectedFlight.from.coordinates[0] + (selectedFlight.to.coordinates[0] - selectedFlight.from.coordinates[0]) * progress
		const lng = selectedFlight.from.coordinates[1] + (selectedFlight.to.coordinates[1] - selectedFlight.from.coordinates[1]) * progress

		mapRef.current.flyTo({
			center: { lat, lng },
			zoom: 3.5, 
			duration: 1500
		})
	}
	const handleAnimateRoute = async () => {
		if (!mapRef.current || !selectedFlight) return

		const from = selectedFlight.from.coordinates
		const to = selectedFlight.to.coordinates

		mapRef.current.flyTo({
			center: { lat: from[0], lng: from[1] },
			zoom: 7,
			duration: 2000
		})

		await new Promise(resolve => setTimeout(resolve, 2100))

		mapRef.current.flyTo({
			center: { lat: to[0], lng: to[1] },
			zoom: 7,
			duration: 4000
		})
	}
	useEffect(() => {
		
		if (!mapRef.current) return;
	
	
		if (!selectedFlight) return; 
	
	
		switch (lastAction) {
			case 'follow':
				handleFollow();
				break;
			case 'animateRoute':
				handleAnimateRoute();
				break;
		
		}
	

	}, [triggerId, selectedFlight, mapRef]);
	return (
		<div className='relative h-screen'>
			<h1 hidden>SkyTrack – flight tracking service</h1>

			<SkyTrackMap mapRef={mapRef} />

			<div className='flex h-screen'>
				<main className='mt-5 flex-1 overflow-hidden'>
					<Outlet />
				</main>
				<Header />
			</div>
			<Toaster position="top-center" richColors />
		</div>
	)
}
